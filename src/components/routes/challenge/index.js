import React, {Component} from 'react';
import {connect} from 'react-redux';

import {URegex} from '../../../utils';

import {getChallenge, sendSolution} from '../../../services/challenge/action';
import {setPageTitle} from '../../../services/global/action';

import Expression from './components/Expression';

import UIBlocker from '../../../ui/UIBlocker';
import {Button} from '../../../ui/FormUI';

import './index.scss';

const replaceSpaces = (string) => string.replace(/ /g, '\u00a0').replace(/\t/g, '\u2003');

class Challenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regexText: "",
            replaceWith: '',
            regexMode: 'g',
            succeeded: 0,
            blockerVisible: false,
        };

        this.sendSolution = this.sendSolution.bind(this);
    }

    componentWillMount() {
        this.props.getChallenge(this.props.match.params.id);
    }

    //noinspection JSMethodCanBeStatic
    componentWillReceiveProps(nextProps) {
        const {data, isPending, error} = nextProps.challenge;

        if (data !== null && !isPending && !error) {
            nextProps.setPageTitle(data.title);
        }
    }

    componentDidUpdate() {
        const {challenge} = this.props;
        const {regexText, regexMode} = this.state;

        let succeeded = 0;

        if (challenge.data !== null && !challenge.isPending && !challenge.error && this.state.regexText) {
            challenge.data.test_cases.forEach(({testCase, regexedTestCase}) => {
                let regex = URegex.regexHandler(regexText, regexMode);

                if (regex) {
                    let test = testCase.replace(regex, this.state.replaceWith) === regexedTestCase;
                    if (test) {
                        succeeded = succeeded + 1;
                    }
                }
            });
        }

        if (succeeded !== this.state.succeeded) {
            this.setState({
                succeeded
            })
        }
    }

    sendSolution() {
        const {challenge} = this.props;
        const {regexText, regexMode, replaceWith, succeeded} = this.state;

        let canSendSolution = false;

        if (challenge.data !== null && !challenge.isPending && !challenge.error && this.state.regexText) {
            canSendSolution = challenge.data.test_cases.length === succeeded;
        }

        if (canSendSolution) {
            this.props.sendSolution(challenge.data._id, {regexText, regexMode, replaceWith})
        }
    };

    render() {
        const {challenge} = this.props;
        const {regexText, regexMode, succeeded} = this.state;

        if (challenge.data !== null && !challenge.isPending && !challenge.error) {
            const canSendSolution = challenge.data.test_cases.length === succeeded;

            return (
                <div className="Challenge">
                    <UIBlocker visible={this.state.blockerVisible}>
                        test
                    </UIBlocker>
                    <div className="Challenge__input">
                        <Expression onChange={(regexText) => this.setState({regexText})}/>
                        <input placeholder="Replace with" value={this.state.replaceWith}
                               onChange={(e) => this.setState({replaceWith: e.target.value})}/>
                        <Button disabled={!canSendSolution} onClick={this.sendSolution}>Send solution</Button>
                    </div>
                    <div className="Challenge__testCases">
                        <div className="Challenge__testCases__title">Test Cases ({succeeded}/{challenge.data.test_cases.length})
                        </div>
                        <div className="Challenge__testCases__container">
                            <ul>
                                {challenge.data.test_cases.map(({testCase, regexedTestCase}, index) => {
                                    let liveP = testCase;
                                    let test = false;
                                    let regex = URegex.regexHandler(regexText, regexMode);

                                    if (regex) {
                                        test = testCase.replace(regex, this.state.replaceWith) === regexedTestCase;
                                        liveP = liveP.replace(regex, this.state.replaceWith);
                                    }

                                    return (
                                        <li key={index}>
                                            <div className="Challenge__testCases__container__problem">
                                                <span
                                                    className={regexText && (test ? 'ok' : 'bad')}>{replaceSpaces(testCase)}</span>
                                            </div>
                                            <i />
                                            <div className="Challenge__testCases__container__result">
                                                <span className={regexText && (test ? 'ok' : 'bad')}>{regexedTestCase}</span>
                                                <span className={`live ${regexText && !test ? 'live--show' : ''}`}>{replaceSpaces(liveP)}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div>loading...</div>
        }
    }
}

const mapStateToProps = ({challengeRedcuer}) => ({
    challenge: challengeRedcuer.challenge,
});

const mapDispatchToProps = (dispatch) => ({
    getChallenge: (id) => dispatch(getChallenge(id)),
    setPageTitle: (title) => dispatch(setPageTitle(title)),
    sendSolution: (id, {regexText, regexMode, replaceWith}) => dispatch(sendSolution(id, {regexText, regexMode, replaceWith})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
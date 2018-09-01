import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getChallenge} from '../../../services/challenge/action'
import {setPageTitle} from '../../../services/global/action'

import Expression from './components/Expression';

import './index.scss';

const replaceSpaces = (string) => string.replace(/ /g, '\u00a0').replace(/\t/g, '\u2003');

class Challenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regexText: "",
            replaceWith: '',
            regexMode: 'g',
        };
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

    render() {
        const {challenge} = this.props;
        const {regexText, regexMode} = this.state;

        const numberOfOk = 0;

        if (challenge.data !== null && !challenge.isPending && !challenge.error) {
            return (
                <div className="Challenge">
                    <div className="Challenge__input">
                        <Expression onChange={(regexText) => this.setState({regexText})}/>
                        <input placeholder="Replace with" value={this.state.replaceWith}
                               onChange={(e) => this.setState({replaceWith: e.target.value})}/>
                    </div>
                    <div className="Challenge__testCases">
                        <div className="Challenge__testCases__title">Test Cases ({numberOfOk}/{challenge.data.test_cases.length})
                        </div>
                        <div className="Challenge__testCases__container">
                            <ul>
                                {challenge.data.test_cases.map(({testCase, regexedTestCase}, index) => {
                                    let liveP = testCase;
                                    let test = false;
                                    let regex = undefined;

                                    try {
                                        regex = new RegExp(regexText, regexMode);
                                    } catch (e) {
                                        regex = undefined;
                                    }

                                    if (regex) {
                                        test = testCase.replace(new RegExp(regexText, regexMode), this.state.replaceWith) === regexedTestCase;
                                        liveP = liveP.replace(new RegExp(regexText, regexMode), this.state.replaceWith);
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
                                                {regexText && !test &&
                                                <span className="live">{replaceSpaces(liveP)}</span>}
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

const mapStateToProps = ({challenge}) => ({
    challenge
});

const mapDispatchToProps = (dispatch) => ({
    getChallenge: (id) => dispatch(getChallenge(id)),
    setPageTitle: (title) => dispatch(setPageTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
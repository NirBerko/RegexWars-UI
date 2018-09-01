import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getAllChallenges} from '../../../services/challenge/action';

import './index.scss';

const Header = () => (
    <div className="Challenges__header">
        <div className="Challenges__header__details">
            <div className="Challenges__header__details__position">
                <h1>Challenges</h1>
                <span>274 challenges</span>
            </div>
        </div>
        <ul className="Challenges__header__tabs">
            <li className="Challenges__header__tabs__tab Challenges__header__tabs__tab--active">All Challenges</li>
        </ul>
    </div>
);

const Challenge = ({_id, title}) => (
    <div className="Challenges__container__list__challenge">
        {/*--solved*/}
        <div className="Challenges__container__list__challenge__title">
            <Link to={`challenge/${_id}`}><h2>{title}</h2></Link>
            <span className="Challenges__container__list__challenge__title__solved">Solved!</span>
        </div>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias commodi dolore doloremque ducimus
            necessitatibus repudiandae tempora. Ab animi, aperiam autem fuga illo ipsam nam nobis quas quisquam rem
            veniam.
        </p>
        <div className="Challenges__container__list__challenge__details">
            <ul>
                <li>Submission: <span>83</span></li>
                <li>Difficulty: <span>Easy</span></li>
            </ul>
            <Link to={`challenge/${_id}`} className="Challenges__container__list__challenge__details__viewChallenge">View Challenge</Link>
        </div>
    </div>
);

const ChallengesList = ({challenges}) => (
    <ul className="Challenges__container__list">
        {challenges.map(challenge => <Challenge key={challenge._id} {...challenge} />)}
    </ul>
);

const Challenges = ({challenges}) => (
    <div className="Challenges">
        <Header />
        <div className="Challenges__container">
            {challenges.data !== null && <ChallengesList challenges={challenges.data}/>}
        </div>
    </div>
);

const mapStateToProps = ({challengeRedcuer}) => ({
    challenges: challengeRedcuer.allChallenges,
});

const mapDispatchToProps = (dispatch) => ({
    getAllChallenges: dispatch(getAllChallenges())
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);
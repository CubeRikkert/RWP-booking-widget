import React, { PureComponent } from 'react';
import BookingWidget from './BookingWidget';
import { getConfig } from '../actions/conf';
import { connect } from 'react-redux';
import '../App.css';
import './Home.css';

class Home extends PureComponent {
  componentWillMount() {
    this.props.getConfig();
  }

  render() {
    return (
      <div className="allBody">
        <div />
        <div className="titleContainer">
          <div>
            <img className="logo" src={require('./logo2.png')} alt="logo" />
          </div>

          <img
            src="http://www.yourlittleblackbook.me/wp-content/uploads/2015/07/Skins-Institute-%E2%80%93-De-L%E2%80%99Europe-1.jpg"
            alt=""
            width="80%"
            height="80%"
          />
          <br />
          <br />
          <hr />
          <div className="containerMultiplePic">
            <img
              alt=""
              className="picContainer2"
              src="https://spa-blumoret.it/wp-content/uploads/2017/01/blu-moret-wellness-spa-centro-benessere-udine-trattamento-fango2.jpg"
              width="300px"
            />
            <img
              alt=""
              className="picContainer2"
              src="http://www.essentiallyyoursblog.com/wp-content/uploads/2015/04/Massage-Oils.jpg?w=1400"
              width="300px"
            />
            <img
              alt=""
              className="picContainer2"
              src="https://static1.squarespace.com/static/56bd004537013b7f82762963/t/586ebd383e00be50807589a4/1483652416664/Fotolia_39256365_Subscription_XL.jpg?format=1500w"
              width="350px"
            />
          </div>
          <hr />
        </div>
        <div className="paragraph">
          <h2>Our Services</h2>
          <p>
            Massages in Amsterdam bij Het Massagehuys Het Massagehuys biedt
            Oosterse massages aan zoals dat hoort. Gewoon, in een leuke straat,
            in De Baarsjes in Amsterdam-West, tussen de mensen. Met een lage
            drempel en een fijne sfeer. Als rustpunt in jouw drukke leven. We
            doen dat met aandacht. Luisterend naar jouw lijf. Natuurlijk en
            eerlijk. We maken onze massageolie zelf, volgens oude
            familierecepten en met zelfgecreëerde blends. We kozen de beste
            biologische thee om het effect van de massage en oliën te
            versterken. Onze masseurs in Amsterdam heten je van harte welkom. Om
            je zuiver te helpen ontspannen en je lichaam en geest weer in balans
            te brengen.
          </p>
        </div>
        <div className="paragraph">
          <h2>Benefits</h2>
          <p>
            Massages in Amsterdam bij Het Massagehuys Het Massagehuys biedt
            Oosterse massages aan zoals dat hoort. Gewoon, in een leuke straat,
            in De Baarsjes in Amsterdam-West, tussen de mensen. Met een lage
            drempel en een fijne sfeer. Als rustpunt in jouw drukke leven. We
            doen dat met aandacht. Luisterend naar jouw lijf. Natuurlijk en
            eerlijk. We maken onze massageolie zelf, volgens oude
            familierecepten en met zelfgecreëerde blends. We kozen de beste
            biologische thee om het effect van de massage en oliën te
            versterken. Onze masseurs in Amsterdam heten je van harte welkom. Om
            je zuiver te helpen ontspannen en je lichaam en geest weer in balans
            te brengen.
          </p>
        </div>
        <hr />
        <div className="employee">
          <h2> Our Employees</h2>
        </div>
        <div>
          <img
            alt=""
            className="picContainer3"
            src="https://static0.codaisseur.com/uploads/team_member/avatar/20/bram-koot-png-5566cc89b8b585591ead68a63abcae0a.png"
            width="300px"
          />
          <img
            alt=""
            className="picContainer3"
            src=" https://static1.codaisseur.com/uploads/team_member/avatar/1/codaisseur-portraits-27-jpg-cb64901ab564a35a59906130ff5970bf.png"
            width="300px"
          />
          <img
            alt=""
            className="picContainer3"
            src=" https://static0.codaisseur.com/uploads/team_member/avatar/27/slack-codaisseur-2018-03-27-rbmm2-png-5aadbccadc4e0eee976c0771be8dda0a.png"
            width="300px"
          />
          <img
            alt=""
            className="picContainer3"
            src=" https://static2.codaisseur.com/uploads/team_member/avatar/26/milan-van-de-bovenkamp-png-99cb4aff9b433aa2725b16c3a0067a2b.png"
            width="300px"
          />
          <img
            alt=""
            className="picContainer3"
            src=" https://static4.codaisseur.com/uploads/team_member/avatar/31/lisa-coffee-png-d5680ffcac03c532a00ec6f22fba5450.png"
            width="300px"
          />
          <img
            alt=""
            className="picContainer4"
            src=" https://static4.codaisseur.com/uploads/team_member/avatar/28/rein-op-t-land-png-8f046bb3066a379ec018a732637a74e1.png"
            width="300px"
          />
        </div>
        <hr />

        <div className="widgetButton">
          <BookingWidget />
        </div>

        <div className="footer">
          <br />
          <c> Opening Time 9:00 - 18:00 </c>
          <br />
          <c> Monday to Saturday </c>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getConfig },
)(Home);

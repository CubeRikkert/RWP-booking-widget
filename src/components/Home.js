import React, { PureComponent } from 'react';
import BookingWidget from './BookingWidget';
import '../App.css';

import './Home.css';

class Home extends PureComponent {
  render() {
    return (
      <div className="allBody">
        <div className="titleContainer">
          <h1> Welcome to CodeSaloon</h1>
          <img
            className="picContainer"
            src="http://www.yourlittleblackbook.me/wp-content/uploads/2015/07/Skins-Institute-%E2%80%93-De-L%E2%80%99Europe-1.jpg"
            width="97%"
            height="auto"
          />
        </div>
        <div className="paragraph">
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

        <BookingWidget />
      </div>
    );
  }
}

export default Home;

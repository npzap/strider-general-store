import React, { Component } from 'react';
import {connect} from "react-redux";
import { Card, Button } from 'react-bootstrap';


class Homepage extends Component {
    constructor(props){
        super(props);

        this.state = {

        }

    }


    render() {
        const { openLoginModal, authedUser } = this.props;

        return(
            <div>
                <Card bg='secondary' border='info' text='light' style={{width: 550, margin: '0 auto', marginTop: 125}}>
                    <Card.Title style={{fontSize: 50, textAlign: 'center'}}>Welcome to the Strider General Store Management App</Card.Title>
                    <Card.Footer style={{textAlign: 'center'}}>
                        {authedUser == null ? (
                            <div>To continue please login <Button style={{marginLeft: "15%"}} variant="outline-info" onClick={openLoginModal}>Login</Button></div>
                            ):(<div/>)}
                    </Card.Footer>
                </Card>

                <Card bg="light" border='info' style={{width: 600, margin: '0 auto', marginTop: 75}}>
                    <Card.Body>
                        <Card.Text style={{fontSize: 15}}>The Strider General Store Management App was built to be the cutting edge receipt displaying application.</Card.Text>
                        <Card.Text style={{fontSize: 15}}>Here is some filler to make the page longer: </Card.Text>
                        <Card.Text>Lorem ipsum dolor sit amet, nibh wisi accommodare duo in, eu movet discere voluptatum pri, ex vel veri ceteros constituam. Discere sadipscing ut pro. Illud mundi dolor an est, inermis incorrupte his in, vide minimum et his. Ea vide numquam per, ex hinc lobortis vituperatoribus vim.
                            Qui eu tamquam ornatus lucilius. Ancillae mnesarchum nam ut, quo tation vocent referrentur cu, nec ex graece senserit honestatis. Mea in accusata patrioque concludaturque, voluptua senserit patrioque te duo, ea eum tale dissentias. Atqui diceret epicurei duo ei. Habemus tractatos cu sea, no vidisse malorum recusabo mel.</Card.Text>

                        <Card.Text>Vix at dicat nihil consequat, usu ex quodsi menandri. Ea sea fabulas omittam. Unum tacimates referrentur vel eu, cum splendide reprehendunt et, mea ex tota tantas. Iudico minimum nec cu, mel an ludus decore melius, ad has vero omnis. Sed ne mundi facilisis, quo an insolens adipisci consequuntur. Cu vim utroque dissentias, fastidii luptatum quo ex, iriure patrioque in duo. Ne ipsum nobis percipit usu, dicta commodo constituto mea ne.

                            Elitr libris possim sea ea. Intellegebat definitiones ex cum, mel ei dicta commune, tamquam explicari sit et. Facete impedit instructior te pro, id blandit salutatus deterruisset vel. Mea voluptatum scribentur persequeris no, scribentur disputando te ius, melius abhorreant qui ad. Quis nihil viderer te est, nam ei maiorum apeirian.

                            Usu justo lucilius intellegam ei, idque elaboraret ei usu, ne eum persius voluptatum. Ei has minim nonumes, cum te scripta intellegat. Sonet electram disputationi vim ut, at vim mucius oblique nostrud. His ad aperiam oportere intellegat, fugit regione inermis vix in, has cu ceteros scribentur.

                            Eos et nibh scripta, solet melius maiestatis te eum. No mel sententiae honestatis, sit in elit solum. Quem placerat ad nam. Fuisset philosophia mea at. Epicurei voluptatum in usu.

                            Eu pro reque qualisque, cu sonet primis vis. Adipisci explicari ei qui. Amet delenit euripidis ei sed. Mel iuvaret intellegebat in. Ipsum euismod has id.</Card.Text>
                        <Card.Text>Vix at dicat nihil consequat, usu ex quodsi menandri. Ea sea fabulas omittam. Unum tacimates referrentur vel eu, cum splendide reprehendunt et, mea ex tota tantas. Iudico minimum nec cu, mel an ludus decore melius, ad has vero omnis. Sed ne mundi facilisis, quo an insolens adipisci consequuntur. Cu vim utroque dissentias, fastidii luptatum quo ex, iriure patrioque in duo. Ne ipsum nobis percipit usu, dicta commodo constituto mea ne.

                            Elitr libris possim sea ea. Intellegebat definitiones ex cum, mel ei dicta commune, tamquam explicari sit et. Facete impedit instructior te pro, id blandit salutatus deterruisset vel. Mea voluptatum scribentur persequeris no, scribentur disputando te ius, melius abhorreant qui ad. Quis nihil viderer te est, nam ei maiorum apeirian.

                            Usu justo lucilius intellegam ei, idque elaboraret ei usu, ne eum persius voluptatum. Ei has minim nonumes, cum te scripta intellegat. Sonet electram disputationi vim ut, at vim mucius oblique nostrud. His ad aperiam oportere intellegat, fugit regione inermis vix in, has cu ceteros scribentur.

                            Eos et nibh scripta, solet melius maiestatis te eum. No mel sententiae honestatis, sit in elit solum. Quem placerat ad nam. Fuisset philosophia mea at. Epicurei voluptatum in usu.

                            Eu pro reque qualisque, cu sonet primis vis. Adipisci explicari ei qui. Amet delenit euripidis ei sed. Mel iuvaret intellegebat in. Ipsum euismod has id.</Card.Text>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

function mapStateToProps({ authedUser }, props){
    return {
        authedUser,
        ...props
    }
}

export default connect(mapStateToProps)(Homepage);

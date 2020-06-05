import React from "react";
import "./style/Form.css";
import Typography from "@material-ui/core/Typography";

const Body = () => {
  return (
    <div className="Body">
      <div>
        <Typography variant="h6" component="div">
          Titel van onderzoek: <br />
          <span className="Titles"> Hoe denk jij over ...?  </span>
        </Typography>
        <Typography variant="h6" component="div">
          Hoofdonderzoeker(s):
          <br />
          <span className="Titles">
            Felienne Hermans,
            <br /> Fenia Aivaloglou
          </span>
        </Typography>
        <Typography variant="h6" component="div">
          Uitvoerend onderzoeker(s): :
          <br />
          <span className="Titles">Shirley de Wit</span>
        </Typography>
        <Typography variant="h6" component="div">
          Onderzoeksgroep: <br />
          <span className="Titles">
            {" "}
            Programming Education Research Group, Universiteit Leiden
          </span>
        </Typography>
      </div>

      <Typography variant="h6" component="div" className="Information">
        Beste deelnemer,
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        Fijn dat je meedoet aan Science Live, het onderzoeksprogramma van NEMO
        Science Museum. Het onderzoek waar je aan meewerkt wordt uitgevoerd door
        onderzoekers van Universiteit Leiden.
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        In dit onderzoek leren we over hoe kinderen denken over een aantal
        beroepen en we hebben daar jouw hulp voor nodig! Ons doel dit weekend (6
        en 7 juni) is om te testen of ons onderzoek duidelijk is. Met jouw
        mening en feedback kunnen we ons onderzoek beter maken! Tijdens de
        zomervakantie zullen we het onderzoek uitvoeren. Wat je precies gaat
        doen is afhankelijk van het moment van de dag dat je meedoet. Je gaat op
        een laptop een aantal testjes doen, een video bekijken en/of we stellen
        je een aantal vragen in een kort interview. Tijdens de interviews maken
        we geluidsopnames.
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        Er wordt geen beloning gegeven voor deelname. Voor dit onderzoek geldt
        de reguliere aansprakelijkheidsverzekering van Universiteit Leiden.
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        Het onderzoek duurt ongeveer 15 minuten.
        <b>
          {" "}
          Je mag het onderzoek op elk gewenst moment stoppen, zonder opgave van
          reden.{" "}
        </b>
        Maak dit kenbaar aan de aanwezige wetenschapper.
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        Verder willen je vragen om na het onderzoek niet te vertellen aan andere
        NEMO-bezoekers wat je precies moest doen, ook niet aan je familie en
        vrienden waarmee je NEMO bezoekt. Zij willen misschien ook deelnemen aan
        dit onderzoek en deze informatie kan de resultaten beïnvloeden.
      </Typography>
      <Typography variant="h6" component="div" className="Information">
        Persoonsgegevens
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        Alle onderzoeksgegevens blijven vertrouwelijk en worden anoniem
        verwerkt. De onderzoeksgegevens worden losgekoppeld van namen; alleen de
        hoofdonderzoeker houdt toegang tot namen. 10 jaar na het onderzoek
        worden de namen definitief verwijderd. U kunt te allen tijde de
        faculteit LIACS, Universiteit Leiden vragen om verwijdering van uw
        gegevens.
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        De geanonimiseerde gegevens zullen worden gebruikt voor onderzoek. Ze
        worden niet gebruikt door NEMO Science Museum.
      </Typography>

      <Typography variant="body2" component="div" className="Paragraph">
        <b>
          {" "}
          Geachte ouder/voogd, we verzoeken je om dit toestemmingsformulier in
          te vullen en te ondertekenen.
        </b>
      </Typography>
      <Typography variant="body2" component="div" className="Paragraph">
        Hierbij verklaart de ouder / voogd van onderstaande minderjarige (n) aan
        NEMO (Stichting Nationaal Centrum voor Wetenschap en Technologie),
        gevestigd aan Oosterdok 2 te Amsterdam dat de volgende kinderen heeft
        deelgenomen aan het op de voorzijde genoemde en beschreven onderzoek.
        Door dit formulier te ondertekenen, geef ik uitdrukkelijk toestemming
        voor deelname aan het onderzoek binnen het Science Live-programma van
        NEMO.
      </Typography>
      <Typography variant="body1" component='div' className="Paragraph">
          <b>
          Op {new Date().getDay()} / {new Date().getMonth()+1} / {new Date().getFullYear()}
          </b>
      </Typography>
    </div>
  );
};

export default Body;

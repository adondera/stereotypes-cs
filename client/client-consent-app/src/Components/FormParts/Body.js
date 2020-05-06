import React from "react";
import "./style/Form.css";
import Typography from "@material-ui/core/Typography";

const Body = () => {
  return (
    <div className="Body">
      <div>
        <Typography variant="h6" component="div">
          Title of study: <span className="Titles">Hello World</span>
        </Typography>
        <Typography variant="h6" component="div">
          Principal Investigator(s) / Head scientist(s):{" "}
          <span className="Titles">Hello World</span>
        </Typography>
        <Typography variant="h6" component="div">
          Researchers: <span className="Titles">Hello World</span>
        </Typography>
        <Typography variant="h6" component="div">
          University / Department: <span className="Titles">Hello World</span>
        </Typography>
      </div>

      <Typography variant="h6" component="div" className="Information">
        Dear participant,
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        We are glad to welcome you in Science Live, NEMO Science Museum’s
        research programme. This study is carried out by researchers from [name
        university].
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        This study is about […….short description of the task in easy to
        understand language, max 100 words……………].
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        No reward is given for participation. The standard liability insurance
        policy of [name of institute] applies to this research.
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        The participation takes about […] minutes.{" "}
        <b>
          You can stop the experiment at any time, without need for a reason
        </b>
        . Just let the researcher know if you would like to quit.
      </Typography>
      <Typography variant="h6" component="div" className="Information">
        Personal data
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        All research data remains confidential and is processed anonymously. The
        research data is disconnected from names; only the principal
        investigator has access to names. [X] years after the investigation, the
        names will be deleted permanently. You can request the faculty [name of
        faculty, institute] to delete your data at any time.
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        The anonymized data will be used for research. They are not stored or
        used by NEMO Science Museum.
      </Typography>

      <Typography variant="h6" component="div" className="Information">
        Dear parent/ guardian,{" "}
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        Would you be so kind as to fill out and sign the consent form?
      </Typography>
      <Typography variant="body1" component="div" className="Paragraph">
        Hereby the parent / guardian of the minor(s) mentioned below declares to
        NEMO (Stichting Nationaal Centrum voor Wetenschap en Technologie),
        located at Oosterdok 2 in Amsterdam, the following: the minor(s)
        has/have participated in research mentioned and described on the front
        page of this form. By signing this form I give explicit permission to
        participate in the research within NEMO's Science Live program.
      </Typography>
    </div>
  );
};

export default Body;

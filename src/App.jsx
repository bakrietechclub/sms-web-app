import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import LandingPage from "./components/pages/LandingPage";
import DashboardPage from "./components/pages/DashboardPage";

// Univ, NGO, Community
import { PotentialPartnerResearch } from "./components/pages/univ/PotentialPartnerResearch";
import { ColabPartnerResearch } from "./components/pages/univ/ColabPartnerResearch";
import { Audience } from "./components/pages/univ/Audience";
import { CoordinationGroup } from "./components/pages/univ/CoordinationGroup";
import { MouPks } from "./components/pages/univ/MouPks";
import { SpkTor } from "./components/pages/univ/SpkTor";
import { Ia } from "./components/pages/univ/Ia";
import { LetterNumbering } from "./components/pages/univ/LetterNumbering";
import { PtaRecap } from "./components/pages/univ/PtaRecap";
import { SatisfactionSurvey } from "./components/pages/univ/SatisfactionSurvey";
import { BcfPartnership } from "./components/pages/univ/BcfPartnership";
import { PartnershipAwards } from "./components/pages/univ/PartnershipAwards";

// Media
import { PartnerResearch } from "./components/pages/media/PartnerResearch";
import { AudienceMedia } from "./components/pages/media/Audience";
import { CoordinationGroupMedia } from "./components/pages/media/CoordinationGroup";
import { MouPksMedia } from "./components/pages/media/MouPks";
import { LetterNumberingMedia } from "./components/pages/media/LetterNumbering";
import { ColabRecapMedia } from "./components/pages/media/ColabRecap";
import { CooperationSign } from "./components/pages/media/CooperationSign";
import { MediaRecap } from "./components/pages/media/MediaRecap";
import { ProgramRecap } from "./components/pages/media/ProgramRecap";
import { BcfPartnershipMedia } from "./components/pages/media/BcfPartnership";

// INGO
import { PotentialPartnerResearchINGO } from "./components/pages/ingo/PotentialPartnerResearch";
import { ColabPartnerResearchINGO } from "./components/pages/ingo/ColabPartnerResearch";
import { AudienceINGO } from "./components/pages/ingo/Audience";
import { CoordinationGroupINGO } from "./components/pages/ingo/CoordinationGroup";
import { MouPksINGO } from "./components/pages/ingo/MouPks";
import { SpkTorINGO } from "./components/pages/ingo/SpkTor";
import { IaINGO } from "./components/pages/ingo/Ia";
import { CooperationSignINGO } from "./components/pages/ingo/CooperationSign";
import { LetterNumberingINGO } from "./components/pages/ingo/LetterNumbering";
import { ColabRecapINGO } from "./components/pages/ingo/ColabRecap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="univ">
          <Route index element={<PotentialPartnerResearch />} />
          <Route path="colab" element={<ColabPartnerResearch />} />
          <Route path="audience" element={<AudienceMedia />} />
          <Route path="coor-group" element={<CoordinationGroup />} />
          <Route path="mou-pks" element={<MouPks />} />
          <Route path="spk-tor" element={<SpkTor />} />
          <Route path="ia" element={<Ia />} />
          <Route path="letter-numbering" element={<LetterNumbering />} />
          <Route path="pta-recap" element={<PtaRecap />} />
          <Route path="satis-survey" element={<SatisfactionSurvey />} />
          <Route path="bcf-partner" element={<BcfPartnership />} />
          <Route path="partner-awards" element={<PartnershipAwards />} />
        </Route>
        <Route path="media">
          <Route index element={<PartnerResearch />} />
          <Route path="audience" element={<Audience />} />
          <Route path="coor-group" element={<CoordinationGroupMedia />} />
          <Route path="mou-pks" element={<MouPksMedia />} />
          <Route path="coop-sign" element={<CooperationSign />} />
          <Route path="letter-numbering" element={<LetterNumberingMedia />} />
          <Route path="media-recap" element={<MediaRecap />} />
          <Route path="program-recap" element={<ProgramRecap />} />
          <Route path="colab-recap" element={<ColabRecapMedia />} />
          <Route path="bcf-partner" element={<BcfPartnershipMedia />} />
        </Route>
        <Route path="ingo">
          <Route index element={<PotentialPartnerResearchINGO />} />
          <Route path="colab" element={<ColabPartnerResearchINGO />} />
          <Route path="audience" element={<AudienceINGO />} />
          <Route path="coor-group" element={<CoordinationGroupINGO />} />
          <Route path="mou-pks" element={<MouPksINGO />} />
          <Route path="spk-tor" element={<SpkTorINGO />} />
          <Route path="ia" element={<IaINGO />} />
          <Route path="coop-sign" element={<CooperationSignINGO />} />
          <Route path="letter-numbering" element={<LetterNumberingINGO />} />
          <Route path="colab-recap" element={<ColabRecapINGO />} />
          <Route path="satis-survey" element={<h1>Satisfaction Survey</h1>} />
          <Route path="bcf-partner" element={<h1>Partnership BCF</h1>} />
          <Route path="partner-awards" element={<h1>Partnership Awards</h1>} />
        </Route>
      </Route>
      <Route
        path="/*"
        element={<h1>Page return into nothing you expect.</h1>}
      />
    </Routes>
  );
};

export default App;

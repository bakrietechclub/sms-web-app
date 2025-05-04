import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import LandingPage from "./components/pages/LandingPage";
import DashboardPage from "./components/pages/DashboardPage";

import { PotentialPartnerResearch } from "./components/pages/univ/PotentialPartnerResearch";
import { ColabPartnerResearch } from "./components/pages/univ/ColabPartnerResearch";
import { Audience } from "./components/pages/univ/Audience";
import { CoordinationGroup } from "./components/pages/univ/CoordinationGroup";
import { MouPks } from "./components/pages/univ/MouPks";
import { SpkTor } from "./components/pages/univ/SpkTor";
import { Ia } from "./components/pages/univ/Ia";
import { LetterNumbering } from "./components/pages/univ/LetterNumbering";
import { PtaRecap } from "./components/pages/univ/PtaRecap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="univ">
          <Route index element={<PotentialPartnerResearch />} />
          <Route path="colab" element={<ColabPartnerResearch />} />
          <Route path="audience" element={<Audience />} />
          <Route path="coor-group" element={<CoordinationGroup />} />
          <Route path="mou-pks" element={<MouPks />} />
          <Route path="spk-tor" element={<SpkTor />} />
          <Route path="ia" element={<Ia />} />
          <Route path="letter-numbering" element={<LetterNumbering />} />
          <Route path="pta-recap" element={<PtaRecap />} />
          <Route path="satis-survey" element={<h1>Satisfaction Survey</h1>} />
          <Route path="bcf-partner" element={<h1>Partnership BCF</h1>} />
          <Route path="partner-awards" element={<h1>Partnership Awards</h1>} />
        </Route>
        <Route path="media">
          <Route index element={<h1>Riset Mitra</h1>} />
          <Route path="audience" element={<></>} />
          <Route path="coor-group" element={<h1></h1>} />
          <Route path="mou-pks" element={<h1>MoU / PKS</h1>} />
          <Route path="coop-sign" element={<h1>Tanda Kerjasama</h1>} />
          <Route path="letter-numbering" element={<h1>Penomoran Surat</h1>} />
          <Route path="media-recap" element={<h1>Rekap Media</h1>} />
          <Route path="program-recap" element={<h1>Rekap Program</h1>} />
          <Route path="colab-recap" element={<h1>Rekap Kerjasama</h1>} />
          <Route path="bcf-partner" element={<h1>Partnership BCF</h1>} />
        </Route>
        <Route path="ingo">
          <Route index element={<h1>Riset Potensial</h1>} />
          <Route path="colab" element={<h1>Riset Kolaborasi</h1>} />
          <Route path="audience" element={<h1>Tabel Audiensi INGO</h1>} />
          <Route path="coor-group" element={<h1>Grup Koordinasi</h1>} />
          <Route path="mou-pks" element={<h1>MoU / PKS</h1>} />
          <Route path="spk-tor" element={<h1>SPK / TOR</h1>} />
          <Route path="ia" element={<h1>IA</h1>} />
          <Route path="coop-sign" element={<h1>Tanda Kerjasama</h1>} />
          <Route path="letter-numbering" element={<h1>Penomoran Surat</h1>} />
          <Route path="colab-recap" element={<h1>Rekap Kerjasama</h1>} />
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

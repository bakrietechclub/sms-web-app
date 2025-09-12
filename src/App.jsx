import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import LandingPage from './components/pages/LandingPage';
import DashboardPage from './components/pages/DashboardPage';
import { PotentialPartner } from './components/pages/Researches/PotentialPartner';
import { ColabPartner } from './components/pages/Researches/ColabPartner';
import { Partner } from './components/pages/Researches/Partner';
import { Audiences } from './components/pages/Audiences';
import { CoordinationGroups } from './components/pages/CoordinationGroups';
import { Mou } from './components/pages/Partnerships/Mou';
import { Pks } from './components/pages/Partnerships/Pks';
import { Spk } from './components/pages/Partnerships/Spk';
import { Tor } from './components/pages/Partnerships/Tor';
import { Ia } from './components/pages/Partnerships/Ia';
import { CooperationSign } from './components/pages/Partnerships/CooperationSign';
import { LetterNumbering } from './components/pages/LetterNumbering';
import { Pta } from './components/pages/Recap/Pta';
import { Colab } from './components/pages/Recap/Colab';
import { Media } from './components/pages/Recap/Media';
import { Program } from './components/pages/Recap/Program';
import { SatisfactionSurvey } from './components/pages/SatisfactionSurvey';
import { BcfPartnership } from './components/pages/BcfPartnership';
import { PartnershipAwards } from './components/pages/PartnershipAwards';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './states/features/preload/preloadThunk';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser = null, isPreload } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (!authUser.user && !isPreload) {
      navigate('/');
    }
  }, [authUser.user, isPreload]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="research">
          <Route path="potential-partner" element={<PotentialPartner />} />
          <Route path="colab-partner" element={<ColabPartner />} />
          <Route path="partner" element={<Partner />} />
        </Route>
        <Route path="audiences" element={<Audiences />} />
        <Route path="groups" element={<CoordinationGroups />}>
          <Route path="contact" element={<h1>Kontak Grup</h1>} />
        </Route>
        <Route path="partnerships">
          <Route path="mou" element={<Mou />} />
          <Route path="pks" element={<Pks />} />
          <Route path="implementation-agreements" element={<Ia />} />
          <Route path="coop-sign" element={<CooperationSign />} />
          <Route path="spk" element={<Spk />} />
          <Route path="tor" element={<Tor />} />
        </Route>
        <Route path="letter-numbers" element={<LetterNumbering />} />
        <Route path="recap">
          <Route path="pta" element={<Pta />} />
          <Route path="media" element={<Media />} />
          <Route path="program" element={<Program />} />
          <Route path="colab" element={<Colab />} />
        </Route>
        <Route path="satisfaction-survey" element={<SatisfactionSurvey />} />
        <Route path="bcf-partner" element={<BcfPartnership />} />
        <Route path="partner-awards" element={<PartnershipAwards />} />
      </Route>
      <Route
        path="/*"
        element={<h1>Page return into nothing you expect.</h1>}
      />
    </Routes>
  );
};

export default App;

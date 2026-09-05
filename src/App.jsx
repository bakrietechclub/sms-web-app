import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import LandingPage from './components/pages/LandingPage';
import DashboardPage from './components/pages/DashboardPage';
import { PotentialPartner } from './components/pages/Researches/PotentialPartner';
import { ColabPartner } from './components/pages/Researches/ColabPartner';
import { Audiences } from './components/pages/Audiences/Audiences';
import { CoordinationGroup } from './components/pages/Groups/CoordinationGroup';
import { Mou } from './components/pages/Partnerships/Mou/Mou';
import { Pks } from './components/pages/Partnerships/Pks/Pks';
import { Spk } from './components/pages/Partnerships/Spk/Spk';
import { Tor } from './components/pages/Partnerships/Tor/Tor';
import { Ia } from './components/pages/Partnerships/Ia/Ia';
import { PartnershipFlowOverview } from './components/pages/Partnerships/PartnershipFlowOverview';
import { PartnershipNetworkPage } from './components/pages/Partnerships/PartnershipNetworkPage';
import { LetterNumbering } from './components/pages/LetterNumber/LetterNumbering';
import { LetterClassifications } from './components/pages/LetterClassification/LetterClassifications';
import { LetterClassificationDetail } from './components/pages/LetterClassification/LetterClassificationDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncPreloadProcess,
  asyncPreloadSelectedAccess,
} from './states/features/preload/preloadThunk';
import PotentialPartnerDetail from './components/pages/Researches/PotentialPartnerDetail';
import AudiencesDetail from './components/pages/Audiences/AudiencesDetail';
import CoordinationGroupDetail from './components/pages/Groups/CoordinationGroupDetail';
import MouDetail from './components/pages/Partnerships/Mou/MouDetail';
import PksDetail from './components/pages/Partnerships/Pks/PksDetail';
import IaDetail from './components/pages/Partnerships/Ia/IaDetail';
import TorDetail from './components/pages/Partnerships/Tor/TorDetail';
import SpkDetail from './components/pages/Partnerships/Spk/SpkDetail';
import LetterNumberingDetail from './components/pages/LetterNumber/LetterNumberingDetail';
import ColabPartnerDetail from './components/pages/Researches/ColabPartnerDetail';
import { PotentialPartnerRecommendations } from './components/pages/Researches/PotentialPartnerRecommendations';
import { PotentialPartnerRecommendationDetail } from './components/pages/Researches/PotentialPartnerRecommendationDetail';
import CoordinationGroupContactUpdate from './components/pages/Groups/CoordinationGroupContactUpdate';
import NotFoundPage from './components/pages/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser = null, isPreload } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(asyncPreloadSelectedAccess());
  }, [dispatch]);

  useEffect(() => {
    if (!authUser.user && !isPreload) {
      navigate('/');
    }
  }, [authUser.user, isPreload, navigate]);

  return (
    <Routes>
      <Route
        path='/'
        element={<LoginPage />}
      />
      <Route
        path='/home'
        element={<LandingPage />}
      />
      {/* Layout tanpa `path` -- anak-anaknya jadi route level-root
          (/research/..., /partnerships/..., dst), bukan berat sebelah
          /dashboard/research/... yang tidak menambah makna apa pun di URL.
          Index lama di sini (duplikat PotentialPartner) dihapus karena
          tidak ada satu pun link yang menuju path kosong ini. */}
      <Route element={<DashboardPage />}>
          <Route path='research'>
            <Route path='potential-partner'>
              <Route
                index
                element={<PotentialPartner />}
              />
              <Route
                path=':id'
                element={<PotentialPartnerDetail />}
              />
            </Route>
            <Route path='potential-recommendations'>
              <Route
                index
                element={<PotentialPartnerRecommendations />}
              />
              <Route
                path=':id'
                element={<PotentialPartnerRecommendationDetail />}
              />
            </Route>
            <Route path='colab-partner'>
              <Route
                index
                element={<ColabPartner />}
              />
              <Route
                path=':id'
                element={<ColabPartnerDetail />}
              />
            </Route>
          </Route>
          <Route path='audiences'>
            <Route
              index
              element={<Audiences />}
            />
            <Route
              path=':id'
              element={<AudiencesDetail />}
            />
          </Route>
          <Route path='groups'>
            <Route
              index
              element={<CoordinationGroup />}
            />
            <Route
              path=':id'
              element={<CoordinationGroupDetail />}
            />
            <Route
              path=':id/contact/:contactId/edit'
              element={<CoordinationGroupContactUpdate />}
            />
          </Route>
          <Route path='partnerships'>
            <Route
              index
              element={<PartnershipFlowOverview />}
            />
            <Route path='mou'>
              <Route
                index
                element={<Mou />}
              />
              <Route
                path=':id'
                element={<MouDetail />}
              />
            </Route>
            <Route
              path='network/:type/:id'
              element={<PartnershipNetworkPage />}
            />
            <Route path='pks'>
              <Route
                index
                element={<Pks />}
              />
              <Route
                path=':id'
                element={<PksDetail />}
              />
            </Route>
            <Route path='implementation-agreements'>
              <Route
                index
                element={<Ia />}
              />
              <Route
                path=':id'
                element={<IaDetail />}
              />
            </Route>
            <Route path='tor'>
              <Route
                index
                element={<Tor />}
              />
              <Route
                path=':id'
                element={<TorDetail />}
              />
            </Route>
            <Route path='spk'>
              <Route
                index
                element={<Spk />}
              />
              <Route
                path=':id'
                element={<SpkDetail />}
              />
            </Route>
          </Route>
          <Route path='letter-numbers'>
            <Route
              index
              element={<LetterNumbering />}
            />
            <Route
              path=':id'
              element={<LetterNumberingDetail />}
            />
          </Route>
          <Route path='letter-classifications'>
            <Route
              index
              element={<LetterClassifications />}
            />
            <Route
              path=':id'
              element={<LetterClassificationDetail />}
            />
          </Route>
      </Route>
      <Route
        path='/*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default App;

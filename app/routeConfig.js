import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import LoginContainer from '@containers/LoginContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  login: {
    component: LoginContainer,
    ...routeConstants.login
  },
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input, Button } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectReposData, selectReposError, selectRepoName } from './selectors';
import { selectUserEmail } from '../App/selectors';
import { homeContainerCreators } from './reducer';
import { loginContainerCreators } from '../LoginContainer/reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchGithubRepos,
  dispatchClearGithubRepos,
  dispatchSignOutUser,
  intl,
  reposData,
  reposError,
  repoName,
  email,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(reposData, 'items', null) || reposError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [reposData]);

  useEffect(() => {
    if (repoName && !reposData?.items?.length) {
      dispatchGithubRepos(repoName);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchGithubRepos(rName);
      setLoading(true);
    } else {
      dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(reposData, 'items', []);
    const totalCount = get(reposData, 'totalCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {repoName && (
              <div>
                <T id="search_query" values={{ repoName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <T id="repository_name" values={{ name: item.name }} />
                <T id="repository_full_name" values={{ fullName: item.fullName }} />
                <T id="repository_stars" values={{ stars: item.stargazersCount }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let repoError;
    if (reposError) {
      repoError = reposError;
    } else if (!get(reposData, 'totalCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <CustomCard color={reposError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <T id={repoError} />
        </CustomCard>
      )
    );
  };
  const redirectToLoginPage = () => {
    history.push('/');
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      {email ? (
        <React.Fragment>
          <RightContent>
            <Button
              type="primary"
              onClick={() => {
                dispatchSignOutUser();
                redirectToLoginPage();
              }}
            >
              <T id="sign_out" />
            </Button>
          </RightContent>
          <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
            <T marginBottom={10} id="get_repo_details" />
            <Search
              data-testid="search-bar"
              defaultValue={repoName}
              type="text"
              onChange={evt => debouncedHandleOnChange(evt.target.value)}
              onSearch={searchText => debouncedHandleOnChange(searchText)}
            />
          </CustomCard>
          {renderRepoList()}
          {renderErrorState()}
        </React.Fragment>
      ) : (
        <CustomCard title={intl.formatMessage({ id: 'access_denied' })} maxwidth={maxwidth}>
          <Button type="primary" onClick={redirectToLoginPage}>
            <T id="log_in" />
          </Button>
        </CustomCard>
      )}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  dispatchSignOutUser: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.object,
  repoName: PropTypes.string,
  email: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  reposData: {},
  reposError: null,
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName(),
  email: selectUserEmail()
});

function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = homeContainerCreators;
  const { signOutUser } = loginContainerCreators;
  return {
    dispatchGithubRepos: repoName => dispatch(requestGetGithubRepos(repoName)),
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos()),
    dispatchSignOutUser: () => dispatch(signOutUser())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);

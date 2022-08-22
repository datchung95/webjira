import { Router, Switch } from 'react-router-dom'
import LoadingComponent from './components/GlobalSetting/LoadingComponent';
import DrawerCyberBugs from './HOC/CyberBugsHOC/DrawerCyberBugs';
// import Header from './components/Home/Header/Header';
// import Modal from './HOC/Modal/Modal';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import IndexCyberBugs from './pages/CyberBugs/ProjectCyberBugs/indexCyberBugs';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import SignUpCyberBugs from './pages/CyberBugs/SignUp/SignUpCyberBugs';
import UserManagement from './pages/CyberBugs/UserManagement/UserManagement';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import { JiraTemplate } from './templates/JiraTemplate/JiraTemplate';
import { history } from './utils/libs/history';

function App() {
  return (
    <Router history={history}>
      <LoadingComponent />
      <DrawerCyberBugs />
      <Switch>
        <UserLoginTemplate exact path='/logincyberbugs' Component={LoginCyberBugs} />
        <UserLoginTemplate exact path='/' Component={LoginCyberBugs} />
        <UserLoginTemplate exact path='/home' Component={LoginCyberBugs} />
        <UserLoginTemplate exact path='/signupcyberbugs' Component={SignUpCyberBugs} />
        <JiraTemplate exact path='/createproject' Component={CreateProject} />
        <JiraTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <JiraTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBugs} />
        <JiraTemplate exact path='/usermanagement' Component={UserManagement} />
        <UserLoginTemplate path='*' Component={LoginCyberBugs} />
      </Switch>
    </Router>
  );
}

export default App;

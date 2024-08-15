import './MainPage.scss';
import { Link } from 'react-router-dom';
import { Paths } from '../../router/routesConstants';

export default function MainPage() {
  return (
    <>
      <header className="header">
        <h1>React Forms</h1>
        <nav>
          <ul className="navLink">
            <li>
              <Link to={Paths.UNCONTROLLED} className="link">
                Uncontrolled Form
              </Link>
            </li>
            <li>
              <Link to={Paths.HOOK_FORM} className="link">
                React Hook Form
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <div className="container">
          <h2>No data</h2>
        </div>
      </main>
    </>
  );
}

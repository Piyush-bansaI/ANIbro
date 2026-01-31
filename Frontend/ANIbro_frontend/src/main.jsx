import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import TypeContext from './Contexts/TypeContext.jsx'
import NavbarContext from './Contexts/NavbarContext.jsx'
import NetworkContext from './Contexts/NetworkContext.jsx'
import Fetcher from './Contexts/Fetcher.jsx'
import MoreInfoContext from './Contexts/MoreInfoContext.jsx'
import SignUpContext from './Contexts/SignUpContext.jsx'
import MessageContext from './Contexts/MessageContext.jsx'
import ProfilePicContext from './Contexts/ProfilePicContext.jsx'
import GenreContext from './Contexts/GenreContext.jsx'
import RecommendContext from './Contexts/RecommendContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TypeContext>
      <NetworkContext>
        <Fetcher>
          <MessageContext>
            <MoreInfoContext>
              <SignUpContext>
                <GenreContext>
                  <ProfilePicContext>
                    <RecommendContext>
                      <NavbarContext>
                        <App />
                      </NavbarContext>
                    </RecommendContext>
                  </ProfilePicContext>
                </GenreContext>
              </SignUpContext>
            </MoreInfoContext>
          </MessageContext>
        </Fetcher>
      </NetworkContext>
    </TypeContext>
  </BrowserRouter>
)

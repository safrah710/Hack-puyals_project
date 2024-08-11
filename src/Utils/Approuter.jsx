import ForgetPasswordPage from "../Component/ForgotPswd";
import LandingPage from "../Component/home";
import SignInPage from "../Component/Loginpage";
import AddIdeaPage from "../Component/ideasadd.jsx";
import SignUpPage from "../Component/Signup";
import Adminlogin from "../Component/Newadmin";
import Dashboard from "../Component/Dashboard";
import ComplaintPage from "../Component/Complaint";
import IdeaSubmissionPage from "../Component/Idea";
import AddComplaintPage from "../Component/Complaintadd.jsx";
import Dash from "../Component/Dash.jsx";
import FeedbackPage from "../Component/Feedback.jsx";
import App1 from "../Component/Chatbot.jsx";
const route=[
    {
        path:"/",
        element:<> <LandingPage/> </>
    },
    {
        path:"/dashboard",
        element:<> <Dash/> </>
    },
    {
        path:"/dashboard/idea",
        element:<> <IdeaSubmissionPage/> </>
    },
    {
        path:"/dashboard/chat",
        element:<> <App1/> </>
    },
    {
        path:"/dashboard/idea/add",
        element:<> <AddIdeaPage/> </>
    },
    {
        path:"/dashboard/ComplaintPage",
        element:<> <ComplaintPage/> </>
    },
    {
        path:"/dashboard/ComplaintPage/add_complaint",
        element:<> <AddComplaintPage/> </>
    },
    {
        path:"/dashboard/feedback",
        element:<> <FeedbackPage/> </>
    },
    {
        path:"/sign_in",
        element:<><SignInPage/></>
    },
    {
        path:"/admin_signin",
        element:<><Adminlogin/></>
    },
    {
        path:"/sign_up",
        element:<> <SignUpPage/></>
    },
    {
        path:"/forgot_pswd",
        element:<> <ForgetPasswordPage/></>
    }
]
export default route
import "./Help.css"
import HelpTitleDescription from "../components/Help/HelpTitleDescription"
import TutorialVideo from "../components/Help/TutorialVideo"

export default function Help() {

  return (
    <main className="help-page-container">
      <HelpTitleDescription />
      <TutorialVideo />
    </main>
  )
}
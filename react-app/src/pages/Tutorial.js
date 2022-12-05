import "./Tutorial.css"
import HelpTitleDescription from "../components/Tutorial/HelpTitleDescription"
import TutorialVideo from "../components/Tutorial/TutorialVideo"

export default function Tutorial() {

  return (
    <main className="help-page-container">
      <HelpTitleDescription />
      <TutorialVideo />
    </main>
  )
}
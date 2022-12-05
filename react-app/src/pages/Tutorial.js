import "./Tutorial.css"
import TutorialVideo from "../components/Tutorial/TutorialVideo"
import TutorialTitleDescription from "../components/Tutorial/TutorialTitleDescription";

export default function Tutorial() {

  return (
    <main className="help-page-container">
      <TutorialTitleDescription />
      <TutorialVideo />
    </main>
  )
}
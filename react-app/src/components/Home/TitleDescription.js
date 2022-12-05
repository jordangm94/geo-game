//This comomponent holds the GlobeHunch brand text and description for the home page

export default function TitleDescription() {

  return (
    <>
      <div className="home-container">
        <div className="home-game-title-container">
        <h1 className="home-game-title">
          GlobeHunch
        </h1>
        </div>
        <div className="home-description">
          Survey incredible surroundings, learn about new locations, <br />all while earning points and climbing the leaderboard.<br /><strong>Free to play!</strong>
        </div>
      </div>
    </>
  );
}
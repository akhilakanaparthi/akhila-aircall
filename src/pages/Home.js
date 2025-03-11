import ActivityFeed from "../components/active/ActivityFeed";
import { toast } from "react-toastify";
import "./Home.css";

const Home = ({ activities, updateItem }) => {
  const handleArchiveAll = async () => {
    try {
      const activeActivities = activities.filter(
        (activity) => !activity.is_archived
      );

      if (activeActivities.length === 0) {
        toast.info("No calls to archive.", {
          autoClose: 2000,
        });
        return;
      }

      await Promise.all(
        activeActivities.map((activity) =>
          updateItem(activity.id, { is_archived: true })
        )
      );
      toast.success("All activities have been archived successfully.", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to archive all calls", {
        autoClose: 2000,
      });
      console.error("Error archiving all calls:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Activity Feed</h1>
          <button className="archive-all-btn" onClick={handleArchiveAll}>
            Archive All
          </button>
        </div>
      </header>
      <main className="home-content">
        <ActivityFeed
          activities={activities?.filter((activity) => !activity.is_archived)}
          updateItem={updateItem}
        />
      </main>
    </div>
  );
};

export default Home;

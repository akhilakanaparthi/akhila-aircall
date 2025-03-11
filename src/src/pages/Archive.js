import { toast } from "react-toastify";
import "./Archive.css";
import ActivityFeed from "../components/active/ActivityFeed";

const Archive = ({ activities, updateItem }) => {
  const handleUnarchiveAll = async () => {
    try {
      const inactiveActivities = activities.filter(
        (activity) => activity.is_archived
      );

      if (inactiveActivities.length === 0) {
        toast.info("No calls to unarchive.", {
          autoClose: 2000,
        });
        return;
      }

      await Promise.all(
        inactiveActivities.map((activity) =>
          updateItem(activity.id, { is_archived: false })
        )
      );
      toast.success("All activities have been archived successfully.", {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to unarchive all calls", {
        autoClose: 2000,
      });
      console.error("Error unarchiving all calls:", error);
    }
  };

  return (
    <div className="archive-container">
      <header className="archive-header">
        <div className="header-content">
          <h1>Archived Calls</h1>
          <button className="unarchive-all-btn" onClick={handleUnarchiveAll}>
            Unarchive All
          </button>
        </div>
      </header>
      <main className="home-content">
        <ActivityFeed
          activities={activities?.filter((activity) => activity.is_archived)}
          updateItem={updateItem}
        />
      </main>
    </div>
  );
};

export default Archive;

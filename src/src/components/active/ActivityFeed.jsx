import React from "react";
import ActivityItem from "../activity-details/ActivityItem";
import { motion } from "framer-motion";
import "./ActivityFeed.css";

const ActivityFeed = ({ activities, updateItem }) => {
  return (
    <motion.div
      className="feed-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {activities?.length > 0 ? (
        activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onArchive={() =>
              updateItem(activity.id, {
                is_archived: activity.is_archived ? false : true,
              })
            }
          />
        ))
      ) : (
        <p className="no-activities">No calls found</p>
      )}
    </motion.div>
  );
};

export default ActivityFeed;

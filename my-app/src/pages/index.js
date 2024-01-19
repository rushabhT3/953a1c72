import React, { useEffect, useState } from "react";
import axios from "axios";

import ActivityFeed from "@/components/ActivityFeed";
import ArchivedCallsList from "@/components/ArchivedCallsList";

const Home = () => {
  const [calls, setCalls] = useState([]);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  const handleToggleClick = () => {
    setShowArchived((prevShowArchived) => !prevShowArchived);
  };

  const handleUnarchiveAll = async () => {
    try {
      await Promise.all(
        archivedCalls.map((call) =>
          axios.patch(
            `https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`,
            {
              is_archived: false,
            }
          )
        )
      );
      // Refresh the data after unarchiving
      fetchData();
    } catch (error) {
      console.error("Error unarchiving calls:", error);
    }
  };

  const handleArchiveAll = async () => {
    try {
      await Promise.all(
        calls.map((call) =>
          axios.patch(
            `https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`,
            {
              is_archived: true,
            }
          )
        )
      );
      // Refresh the data after archiving
      fetchData();
    } catch (error) {
      console.error("Error unarchiving calls:", error);
    }
  };

  const fetchData = async () => {
    try {
      const { data: callData } = await axios.get(
        "https://cerulean-marlin-wig.cyclic.app/activities"
      );
      const activeCalls = callData.filter((call) => !call.is_archived);
      const archivedCalls = callData.filter((call) => call.is_archived);

      setCalls(activeCalls);
      setArchivedCalls(archivedCalls);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleArchive = async (event, id, is_archived) => {
    event.stopPropagation();
    try {
      await axios.patch(
        `https://cerulean-marlin-wig.cyclic.app/activities/${id}`,
        {
          is_archived: !is_archived,
        }
      );
      // Refresh the data after archiving/unarchiving
      fetchData();
    } catch (error) {
      console.error("Error archiving/unarchiving call:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-full mb-4"
        onClick={handleToggleClick}
      >
        {showArchived ? "Show Active Calls" : "Show Archived Calls"}
      </button>
      {showArchived ? (
        <ArchivedCallsList
          calls={archivedCalls}
          isLoading={isLoading}
          onUnarchiveAll={handleUnarchiveAll}
          onArchive={handleArchive}
        />
      ) : (
        <ActivityFeed
          calls={calls}
          isLoading={isLoading}
          onArchiveAll={handleArchiveAll}
          onArchive={handleArchive}
        />
      )}
    </div>
  );
};

export default Home;

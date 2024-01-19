const ArchivedCallsList = ({ calls, isLoading, onUnarchiveAll, onArchive }) => {
    
  if (isLoading) {
    return <div>Loading...</div>; // Replace this with your actual loading component
  }

  const formattedStartTime = (call) => {
    // Ensure consistent formatting across server and client
    return new Date(call.created_at).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-4"
        onClick={onUnarchiveAll}
      >
        Unarchive All Calls
      </button>
      <ul className="grid grid-cols-1 gap-4 bg-white rounded-lg shadow-md p-4">
        {calls.map((call) => (
          <li
            key={call.id}
            className="flex items-center justify-between py-4 px-6 border-b border-gray-200 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <img
                src="https://avatars.dicebear.com/api/avataaars/"
                alt={call.from}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{call.from}</span>
                <span className="text-sm text-gray-500">
                  {call.call_type} call
                </span>
                {call.call_type == "missed" && (
                  <strong>
                    <span className="text-red-500 ml-2">Missed ☹</span>
                  </strong>
                )}
              </div>
            </div>
            <span className="text-gray-500">{formattedStartTime(call)}</span>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={(event) => onArchive(event, call.id, call.is_archived)}
            >
              Unarchive
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedCallsList;

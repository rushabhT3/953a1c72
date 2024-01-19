// pages/call/[callId].js
import axios from "axios";

const CallDetail = ({ call }) => {
  if (!call) {
    return <div>No call data available</div>;
  }

  // Display call details here
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Call Details
          </h1>
          {/* Add buttons for actions (e.g., call back, message, archive) here */}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
            <p className="text-lg font-medium text-gray-700">Call ID:</p>
            <p className="text-lg">{call.id}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-lg font-medium text-gray-700">Initiator:</p>
            <p className="text-lg">{call.from}</p>
            <p className="text-lg font-medium text-gray-700">Recipient:</p>
            <p className="text-lg">{call.to}</p>
          </div>
          <div className="col-span-1 space-y-2">
            <p className="text-lg font-medium text-gray-700">Type:</p>
            <p className="text-lg font-medium">{call.call_type}</p>
            <p className="text-lg font-medium text-gray-700">Start Time:</p>
            <p className="text-lg">
              {new Date(call.created_at).toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-lg font-medium text-gray-700">Duration:</p>
            <p className="text-lg">{call.duration}</p>
            <p className="text-lg font-medium text-gray-700">Call Type:</p>
            <p className="text-lg">{call.call_type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { callId } = context.params;
  const res = await axios.get(
    `https://cerulean-marlin-wig.cyclic.app/activities/${callId}`
  );
  const call = res.data;

  return {
    props: {
      call,
    },
  };
}

export default CallDetail;

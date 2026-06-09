const PastEventsHeader = () => {
  return (
    <div className="novaEventsHeader">
      <h1>Events</h1>

      <p>
        Manage your subscription,
        payments method, and billing history
      </p>

      <div className="novaEventsTabs">
        <button>Upcoming Events</button>

        <button className="novaActiveTab">
          Past Events
        </button>
      </div>
    </div>
  );
};

export default PastEventsHeader;
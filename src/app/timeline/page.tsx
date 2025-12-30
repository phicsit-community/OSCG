import { EventCard } from "./_components/event-card";

const EventTimeline = () => {
  const events = [
    {
      status: "Open" as const,
      title: "Registrations Open",
      description: "Participants from across the globe can officially register for OSCG’26.",
      date: "1st December, 2025",
      location: "Virtual",
      attendees: "500+",
    },
    {
      status: "upcoming" as const,
      title: "Orientation Session",
      description: "Introduction to the event structure, contribution guidelines, tracks, and expectations.",
      date: "30th January, 2026",
      location: "Virtual",
      attendees: "300+",
    },
    {
      title: "Introduction to Open Source Session",
      description: "A foundational session covering open-source principles, workflows, and how to get started.",
      date: "3rd February, 2026",
      location: "Virtual",
      attendees: "200+",
    },
    {
      title: "OSCG’26 Contribution Period Begins",
      description: "Participants start contributing to open-source projects, collaborating with mentors and teams.",
      date: "5th February, 2026",
      location: "Virtual",
      attendees: "800+",
    },
    {
      title: "OSCG’26 Concludes",
      description: "End of the contribution phase, final evaluations, recognitions, and closing activities.",
      date: "25th February, 2026",
      location: "Multiple Cities",
      attendees: "1000+",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        <div className="text-center my-12 mb-16">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Event <span className="text-[#4FD1D0]">Timeline</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 px-4">
            Join us at upcoming events and workshops designed to inspire and connect developers.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="space-y-8">
            {events.map((event, index) => (
              <EventCard
                key={index}
                {...event}
                index={index}
                totalEvents={events.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
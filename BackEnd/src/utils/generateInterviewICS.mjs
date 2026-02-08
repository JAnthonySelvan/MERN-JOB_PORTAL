import ics from "ics";

export const generateInterviewICS = (interview, applicantEmail) => {
  return new Promise((resolve, reject) => {
    const [hour, minute] = interview.time.split(":").map(Number);

    const event = {
      start: [
        interview.date.getFullYear(),
        interview.date.getMonth() + 1,
        interview.date.getDate(),
        hour,
        minute,
      ],
      duration: { hours: 1 },
      title: "Job Interview",
      description: "Interview scheduled via Job Portal",
      location:
        interview.mode === "online" ? interview.link : interview.location,
      attendees: [{ email: applicantEmail }],
      status: "CONFIRMED",
      organizer: { name: "Job Portal", email: process.env.EMAIL_USER },
    };

    ics.createEvent(event, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
};

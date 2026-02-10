import Reveal from "./Reveal";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            About This Job Portal
          </h2>

          <p className="text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-12 text-lg">
            A full-stack job portal built to simulate real-world hiring
            platforms, focusing on performance, security, and user experience.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-xl font-semibold mb-3">👨‍💼 For Job Seekers</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Browse and search jobs</li>
                <li>• Save jobs for later</li>
                <li>• Apply with one click</li>
                <li>• Track application & interview status</li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-xl font-semibold mb-3">🏢 For Recruiters</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Post and manage jobs</li>
                <li>• View applicants</li>
                <li>• Shortlist & reject candidates</li>
                <li>• Schedule interviews</li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow">
              <h3 className="text-xl font-semibold mb-3">🛠 Admin Controls</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Approve recruiters</li>
                <li>• Manage users</li>
                <li>• Monitor platform activity</li>
                <li>• Secure role-based access</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Tech Stack */}
        <Reveal>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">Tech Stack</h3>
            <p className="text-gray-600 dark:text-gray-300">
              MERN Stack — MongoDB, Express, React, Node.js
              <br />
              Redux Toolkit, JWT Auth, Tailwind CSS, Nodemailer
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;

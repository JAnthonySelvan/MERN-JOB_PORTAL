import Reveal from "./Reveal";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Contact & Developer Info
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Feel free to connect with me for collaboration, feedback, or
            opportunities.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 shadow">
              <h3 className="text-xl font-semibold mb-4">👨‍💻 Developer</h3>

              <p className="mb-2">
                <strong>Name:</strong> ANTHONYSELVAN J
              </p>
              <p className="mb-2">
                <strong>Role:</strong> Full Stack MERN Developer
              </p>
              <p className="mb-2">
                <strong>Location:</strong> India
              </p>
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:janthonyselvan07@gmail.com"
                  className="text-blue-600 dark:text-blue-400"
                >
                  janthonyselvan07@gmail.com
                </a>
              </p>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Passionate about building scalable web applications and
                real-world systems with clean architecture.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 shadow">
              <h3 className="text-xl font-semibold mb-4">🌐 Connect With Me</h3>

              <ul className="space-y-4">
                <li>
                  <a
                    href="https://github.com/JAnthonySelvan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GitHub Profile
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/in/anthonyselvan-j"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:janthonyselvan07@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Send an Email
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

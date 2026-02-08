import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  scheduleInterview,
  fetchApplicants,
  editInterview,
} from "../../features/application/applicationSlice";

const ScheduleInterview = ({
  applicationId,
  jobId,
  interview,
  isEdit = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    mode: "online",
    date: "",
    time: "",
    link: "",
    location: "",
  });

  useEffect(() => {
    if (isEdit && interview) {
      setForm({
        mode: interview.mode,
        date: interview.date.slice(0, 10),
        time: interview.time,
        link: interview.link || "",
        location: interview.location || "",
      });
    }
  }, [isEdit, interview]);

  const submitHandler = async () => {
    if (isEdit) {
      await dispatch(editInterview({ applicationId, data: form }));
    } else {
      await dispatch(scheduleInterview({ applicationId, data: form }));
    }

    dispatch(fetchApplicants(jobId));
    onClose?.();
  };

  return (
    <div className="mt-3 p-3 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full">
      <select
        value={form.mode}
        onChange={(e) => setForm({ ...form, mode: e.target.value })}
        className="w-full mb-2 p-2 rounded dark:bg-gray-700"
      >
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full mb-2 p-2 rounded dark:bg-gray-700"
      />

      <input
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        className="w-full mb-2 p-2 rounded dark:bg-gray-700"
      />

      {form.mode === "online" && (
        <input
          value={form.link}
          placeholder="Meeting link"
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full mb-2 p-2 rounded dark:bg-gray-700"
        />
      )}

      {form.mode === "offline" && (
        <input
          value={form.location}
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full mb-2 p-2 rounded dark:bg-gray-700"
        />
      )}

      <button
        onClick={submitHandler}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded w-full"
      >
        {isEdit ? "Update Interview" : "Schedule Interview"}
      </button>
    </div>
  );
};

export default ScheduleInterview;

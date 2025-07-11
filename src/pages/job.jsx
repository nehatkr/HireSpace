import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5 fade-in">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center slide-up">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl animate-pulse-slow">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12 transition-transform duration-300 hover:scale-110" alt={job?.title} />
      </div>

      <div className="flex justify-between slide-up stagger-1">
        <div className="flex gap-2 items-center text-gray-300 hover:text-white transition-colors duration-300">
          <MapPinIcon /> {job?.location}
        </div>
        <div className="flex gap-2 items-center text-gray-300 hover:text-blue-400 transition-colors duration-300">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2 items-center text-gray-300 hover:text-green-400 transition-colors duration-300">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {job?.recruiter_id === user?.id && (
        <div className="slide-up stagger-2">
        <Select onValueChange={handleStatusChange} className="transition-all duration-300">
          <SelectTrigger
            className={`w-full transition-all duration-300 ${job?.isOpen ? "bg-green-950/50 border-green-500/50 hover:bg-green-900/50" : "bg-red-950/50 border-red-500/50 hover:bg-red-900/50"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold slide-up stagger-3 gradient-title">About the job</h2>
      <p className="sm:text-lg text-gray-300 leading-relaxed slide-up stagger-4">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold slide-up stagger-5 gradient-title">
        What we are looking for
      </h2>
      <div className="slide-up stagger-5">
      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg text-gray-300 leading-relaxed"
      />
      </div>
      {job?.recruiter_id !== user?.id && (
        <div className="slide-up stagger-5">
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
        </div>
      )}
      
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-4 slide-up stagger-5">
          <h2 className="font-bold mb-4 text-xl ml-1 gradient-title">Applications</h2>
          {job?.applications.map((application, index) => {
            return (
              <div key={application.id} className={`fade-in stagger-${Math.min(index % 3 + 1, 3)}`}>
                <ApplicationCard application={application} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobPage;
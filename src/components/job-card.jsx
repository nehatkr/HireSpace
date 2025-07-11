import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  onJobAction = () => {},
  savedInit = false,
  isMyJob = true,
}) => { 

    const [saved, setSaved] = useState(savedInit);
    const { user } = useUser();
    const {
        loading: loadingSavedJob,
        data: savedJob,
        fn: fnSavedJob,
      } = useFetch(saveJob,{
        alreadySaved: saved,
      });
    

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const {loading: loadingDeleteJob, fn: fnDeleteJob} = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async()=>{
    await fnDeleteJob();
    onJobAction();
  }

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col hover-lift glass-effect border-0 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {loadingDeleteJob && (
            <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )}
      <CardHeader className="relative z-10">
        <CardTitle className="flex justify-between font-bold group-hover:text-blue-400 transition-colors duration-300">
          {job.title}

          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer hover:text-red-400 transition-all duration-300 hover:scale-110"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1 relative z-10">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6 transition-transform duration-300 hover:scale-110" />}
          <div className="flex gap-2 items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr className="border-white/20" />
        <p className="text-gray-300 leading-relaxed">{job.description.substring(0, job.description.indexOf("."))}</p>
      </CardContent>
      <CardFooter className="flex gap-2 relative z-10">
        <Link to={`/job/${job.id}`} className="flex-1">
        <Button variant="secondary" className="w-full hover-lift group/btn relative overflow-hidden">
          <span className="relative z-10">
            More Details
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left opacity-20"></div>
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15 hover-lift transition-all duration-300 hover:border-red-400"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" className="animate-pulse" />
            ) : (
              <Heart size={20} className="hover:text-red-400 transition-colors duration-300" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;

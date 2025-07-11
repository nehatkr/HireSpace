import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const jobsPerPage = 6;
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });
 
  const {
     fn: fnCompanies,
      data: companies 
    } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded){
    fnCompanies();
    console.log(companies);
    
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
    setCurrentPage(1);
    handlePageTransition();
  };

  const handlePageTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      handlePageTransition();
      // Smooth scroll to top of job listings
      document.getElementById('job-listings')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Calculate pagination
  const totalJobs = Jobs?.length || 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = Jobs?.slice(startIndex, endIndex) || [];

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="fade-in">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-6xl text-center pb-8 slide-up">
        Latest jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3 slide-up stagger-1"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md glass-effect border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <Button type="submit" className="h-full sm:w-28 hover-lift group relative overflow-hidden" variant="blue">
          <span className="relative z-10">
          Search
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 slide-up stagger-2">
        <Select value={location} onValueChange={(value) => setLocation(value)} className="transition-all duration-300">
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2 hover-lift group relative overflow-hidden"
          variant="destructive"
          onClick={clearFilters}
        >
          <span className="relative z-10">
          Clear Filters
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      <div id="job-listings" className="scroll-mt-4">
      {loadingJobs === false && (
        <>
          <div className="mt-8 mb-6 flex justify-between items-center slide-up stagger-3">
            <div className="text-gray-400">
              {totalJobs > 0 && (
                <span className="text-sm">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalJobs)} of {totalJobs} jobs
                </span>
              )}
            </div>
            {totalJobs > jobsPerPage && (
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>
          
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
            isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            {currentJobs?.length ? (
              currentJobs.map((job, index) => {
                return (
                  <div 
                    key={job.id} 
                    className={`fade-in transition-all duration-500 ${
                      isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    <JobCard
                      job={job}
                      savedInit={job?.saved?.length > 0}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-400 text-xl py-12 slide-up">
                <div className="space-y-4">
                  <div className="text-6xl">😢</div>
                  <div>No Jobs Found</div>
                  <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 mb-8 slide-up stagger-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === 'ellipsis' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer min-w-[40px]"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default JobListing;

              return (
                <div key={job.id} className={`fade-in stagger-${Math.min(index % 5 + 1, 5)}`}>
                  <JobCard
                  job={job}
                  savedInit={job?.saved?.length>0}
                />
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 text-xl py-12 slide-up"> No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

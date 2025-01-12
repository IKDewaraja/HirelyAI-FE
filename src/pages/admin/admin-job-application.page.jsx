import { useEffect, useState } from "react";
import { getJobApplicationById } from "@/lib/api/jobApplication";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function AdminJobApplicationPage() {
  const [jobApplication, setJobApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const { jobApplicationId } = useParams();

  useEffect(() => {
    if (!jobApplicationId) return;
    getJobApplicationById(jobApplicationId)
      .then((data) => {
        setJobApplication(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [jobApplicationId]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-y-4">
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-foreground">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle>{jobApplication?.fullName}</CardTitle>
          <Badge>
            {jobApplication?.rating?.toLocaleLowerCase()}
          </Badge>
        </CardHeader>
      </Card>

      <Card className="p-4">
        {jobApplication.answers.map((answer, i) => {
          return <p key={i}>{answer}</p>;
        })}
      </Card>
      <div>
        <Button variant="link" asChild>
          <Link to={"/admin/jobs"}>Back</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdminJobApplicationPage;

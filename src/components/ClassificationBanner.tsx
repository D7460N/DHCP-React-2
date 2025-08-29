import { useState, useEffect } from "react";
import { getClassificationData } from "../ClassificationBanner/api/classificationDataApi";
import { ClassificationData } from "../ClassificationBanner/types/ClassificationData";

type Props = {
  data: ClassificationData | null;
};

export dault function ClassificationBanner({
  data,
}: Props) {

  return (
    <div className="flex justify-center"><p classname="bg-bluue-200 p-1">{data?.ClassificationBanner}</p></div>
  );
};

export const GetClassificationData = () => {
  const [classificationData, setClassificationData] = useState<ClassificationData | null>(null);

  // Fetch classification data
  useEffect(() => {
    const fetchClassificationData = async () => {
      try {
        const classificationData = await getClassificationData();
        setClassificationData(classificationData);
      } catch (error) {
        console.error('Error fetching classification data:', error);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchClassificationData();
  }, []);

  return classificationData;
}

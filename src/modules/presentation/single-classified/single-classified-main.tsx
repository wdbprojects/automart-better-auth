import { ClassifiedWithImagesAndMake } from "@/config/types";
import SingleClassified from "@/modules/components/single-classified-comps/single-classified";

const SingleClassifiedMain = (props: ClassifiedWithImagesAndMake) => {
  const classified = props;
  return (
    <main className="flex h-full overflow-auto">
      <SingleClassified {...classified} />
    </main>
  );
};

export default SingleClassifiedMain;

//-----------Libaries-----------//
import Application from "./Application";

const ApplicationGroup = ({ header, apps }) => {
  return (
    <section className="mx-1 my-2 h-[85vh] w-[280px] shrink-0 overflow-y-auto border-2 border-accent p-1 text-center text-lg">
      <h1>
        {header}
        {"  "}({apps.length})
      </h1>
      <div className="flex w-full flex-col items-center justify-center ">
        {apps &&
          apps.map((app, index) => (
            <Application key={index} application={app} />
          ))}
      </div>
    </section>
  );
};

export default ApplicationGroup;

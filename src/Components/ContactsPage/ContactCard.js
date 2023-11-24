import { getLastUpdatedText } from "../../Utilities/formatting";

const ContactPreview = ({ data }) => {
  return (
    <div className="m-1 h-[180px] w-[350px] bg-orange-100 p-2">
      <p className="rounded-lg bg-primary px-2 text-lg font-bold text-text">
        {data.contactName}
      </p>
      <p className=" italic text-black">
        {data.companyName} - {data.jobPosition}
      </p>
      <p className="text-sm text-primary">Email: {data.email}</p>
      <p className="text-sm text-primary">Contact: {data.phoneNumber}</p>
      <p className="text-sm text-primary">Notes: {data.notes}</p>
      <p className="text-xs text-slate-600">
        Last Contacted: {getLastUpdatedText(data.lastContactedDate)}
      </p>
    </div>
  );
};

export default ContactPreview;

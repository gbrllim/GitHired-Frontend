const ContactPreview = ({ data }) => {
  return (
    <div className="m-1 bg-accent p-2">
      <p className="text-black">{data.contactName}</p>
      <p className="text-black">{data.companyName}</p>
      <p className="text-black">{data.jobPosition}</p>
      <p className="text-black">{data.email}</p>
      <p className="text-black">{data.phoneNumber}</p>
      <p className="text-black">{data.notes}</p>
      <p className="text-black">{data.lastContactedDate}</p>
    </div>
  );
};

export default ContactPreview;

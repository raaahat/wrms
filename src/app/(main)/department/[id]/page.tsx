type SingleDepartmentProps = {
  params: {
    id: string;
  };
};
const SingleDepartment = ({ params }: SingleDepartmentProps) => {
  return <div>SingleDepartment {params.id}</div>;
};

export default SingleDepartment;

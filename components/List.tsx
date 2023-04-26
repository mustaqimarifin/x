"use client";
interface ListContainerProps {
  children: React.ReactNode;
}

const ListContainer = ({ children }: ListContainerProps) => {
  return <ul className="relative ">{children}</ul>;
};

interface ListItemProps {
  id?: string;
  hidden?: boolean;
  children: React.ReactNode;
}

const ListItem = ({ id, hidden, children }: ListItemProps) => {
  return (
    <li className=" border border-zinc-100 pb-4 pt-4 " id={id} hidden={hidden}>
      {children}
    </li>
  );
};

export { ListContainer, ListItem };

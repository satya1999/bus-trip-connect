
import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  description?: string;
  value: string | number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  variant?: "default" | "link";
}

export const StatCard = ({ 
  title, 
  description, 
  value, 
  icon, 
  action,
  variant = "default"
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className={variant === "default" ? "pb-2" : ""}>
        <CardTitle className={variant === "default" ? "text-lg" : ""}>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span className={variant === "default" ? "text-2xl font-bold" : "text-3xl font-bold"}>
              {value}
            </span>
          </div>
          {variant === "default" && action && (
            <Button variant="outline" size="sm" 
              {...(action.href 
                ? { asChild: true, children: <Link to={action.href}>{action.label}</Link> }
                : { onClick: action.onClick, children: action.label }
              )}
            />
          )}
        </div>
        {variant !== "default" && action && (
          <Button className="w-full mt-4" 
            {...(action.href 
              ? { asChild: true, children: <Link to={action.href}>{action.label}</Link> }
              : { onClick: action.onClick, children: action.label }
            )}
          />
        )}
      </CardContent>
    </Card>
  );
};

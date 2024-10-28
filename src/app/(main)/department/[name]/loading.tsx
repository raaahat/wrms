import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Component() {
  return (
    <Card className="mx-auto max-w-[400px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <Skeleton className="h-4 w-48" />
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {[1, 2, 3].map((item) => (
            <li
              key={item}
              className="flex items-center shadow-sm px-4 py-1 border border-muted rounded-md"
            >
              <Skeleton className="h-2 w-2 rounded-full mr-2" />
              <Skeleton className="h-4 w-24" />
              <div className="ml-auto flex gap-4">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

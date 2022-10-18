import { Skeleton } from '@mui/material';

export default function FormSkeleton() {
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-row gap-3">
        <Skeleton variant="text" width={150} sx={{ fontSize: '2.25rem' }} />
        <Skeleton variant="text" width={300} sx={{ fontSize: '2.25rem' }} />
      </div>
      <div className="d-flex flex-row gap-3">
        <Skeleton variant="text" width={150} sx={{ fontSize: '2.25rem' }} />
        <Skeleton variant="text" width={300} sx={{ fontSize: '2.25rem' }} />
      </div>
      <div className="d-flex flex-row gap-3">
        <Skeleton variant="text" width={150} sx={{ fontSize: '2.25rem' }} />
        <Skeleton variant="text" width={300} sx={{ fontSize: '2.25rem' }} />
      </div>
      <div className="d-flex flex-row gap-3">
        <Skeleton variant="text" width={150} sx={{ fontSize: '2.25rem' }} />
      </div>
    </div>
  );
}

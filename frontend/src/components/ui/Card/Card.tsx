import { cn } from '../../../utils/cn';
import styles from './Card.module.css';

export const Card = ({ className, ref, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      ref={ref}
      className={cn(styles.card, className)}
      {...props}
    />
  );
}

export const CardHeader = ({ className, ref, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      ref={ref}
      className={cn(styles.header, className)}
      {...props}
    />
  );
}

export const CardTitle = ({ className, ref, ...props }: React.ComponentProps<'h3'>) => {
  return (
    <h3
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    />
  );
}

export const CardDescription = ({ className, ref, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      ref={ref}
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

export const CardContent = ({ className, ref, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      ref={ref}
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

export const CardFooter = ({ className, ref, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      ref={ref}
      className={cn(styles.footer, className)}
      {...props}
    />
  );
}
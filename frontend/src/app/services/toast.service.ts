import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';

export interface Toast {
  message: string;
  type: 'success' | 'warning' | 'primary' | 'info' | 'danger' | 'confirm';
  onConfirm?: () => void;
  onCancel?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastsSubject: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  readonly toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  constructor() { }

  show(toast: Toast, duration: number = 5000): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);
    if (duration > 0) {
      timer(duration).pipe(take(1)).subscribe(() => {
        this.remove(toast);
      });
    }
  }

  showSuccess(message: string): void {
    this.show({ message, type: 'success' });
  }

  showWarning(message: string): void {
    this.show({ message, type: 'warning' });
  }

  showInfo(message: string): void {
    this.show({ message, type: 'info' });
  }

  showDanger(message: string): void {
    this.show({ message, type: 'danger' });
  }

  confirm(message: string, onConfirm: () => void, onCancel?: () => void): void {
    this.show({ message, type: 'confirm', onConfirm, onCancel });
  }

  remove(toast: Toast): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t !== toast));
  }

  clear(): void {
    this.toastsSubject.next([]);
  }
}

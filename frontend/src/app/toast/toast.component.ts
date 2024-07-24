import { Component } from '@angular/core';
import { Toast, ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  removeToast(toast: Toast) {
    this.toastService.remove(toast);
  }

  confirmToast(toast: Toast) {
    if (toast.onConfirm) {
      toast.onConfirm();
    }
    this.removeToast(toast);
  }

  cancelToast(toast: Toast) {
    if (toast.onCancel) {
      toast.onCancel();
    }
    this.removeToast(toast);
  }
}


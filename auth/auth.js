const firebaseApp = firebase.initializeApp({
  apiKey:  'API key',
  authDomain:  'Auth domain',
  projectId:  'Project ID',
  storageBucket:  'Storage bucket',
  messagingSenderId:  'Sender ID',
  appId:  'App ID'
});

const db = firebaseApp.database();
const auth = firebaseApp.auth();

const signUp = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const fullName = document.getElementById("fullName").value;
  const messageReg = document.getElementById("messageReg");

  if (password !== confirmPassword) {
    messageReg.textContent = "Mật khẩu và xác nhận mật khẩu không khớp nhau.";
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      user.sendEmailVerification().then(function() {
        console.log('Đã gửi mail xác thực.');
      }).catch(function(error) {
        console.error('Có lỗi khi gửi xác thực: ', error);
      });

      const userId = user.uid;
      user.updateProfile({
        displayName: fullName
      }).then(() => {
        console.log('ok')
      }).catch((error) => {
        console.log('fail')
      });

      firebase.database().ref('users/' + userId).set({
        fullName: fullName,
        email: email
      })
        .then(() => {
          alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
          showLoginForm();
        })
        .catch((error) => {
          console.error("Error saving user data: ", error);
          messageReg.textContent = "Đăng ký thành công, nhưng không thể lưu thông tin người dùng vào cơ sở dữ liệu.";
        });
    })
    .catch((error) => {
      messageReg.textContent = error.message;
    });
}

const signIn = () => {
  const email = document.getElementById("Inemail").value;
  const password = document.getElementById("Inpassword").value;
  const messageLog = document.getElementById("messageLog");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      if (user.emailVerified) {
        localStorage.setItem('displayName', user.displayName);
        location.href = "../index.html";
      } else {
        user.sendEmailVerification().then(function() {
          console.log('Đã gửi lại mail xác thực.');
        }).catch(function(error) {
          console.error('Có lỗi khi gửi lại xác thực: ', error);
        });
        messageLog.textContent = "Email của bạn chưa được xác nhận. Vui lòng kiểm tra email và xác nhận tài khoản trước khi đăng nhập.";
        firebase.auth().signOut();
      }
    })
    .catch((error) => {
      messageLog.textContent = error.message;
    });
}

const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      alert("Đăng xuất thành công");

      localStorage.removeItem('displayName');
      location.reload();
      document.getElementById("dropdownContent").classList.remove("show");
    })
    .catch((error) => {
      console.error("Lỗi khi đăng xuất:", error);
    });
}

const forgotPassword = () => {
  const email = document.getElementById("forgotEmail").value;
  const messageForgot = document.getElementById("messageForgot");

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
       alert("Một email đã được gửi đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến của bạn để đặt lại mật khẩu.");
       showLoginForm()
    })
    .catch((error) => {
      messageForgot.textContent = error.message;
    });
}

function changePassword() {
  const email = document.getElementById('changeEmail').value;
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;
  const messageChange = document.getElementById('messageChange');

  if (email === '' || currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
      messageChange.textContent = 'Vui lòng điền đầy đủ thông tin.';
      return;
  }

  if (newPassword !== confirmNewPassword) {
      messageChange.textContent = 'Mật khẩu mới và xác nhận mật khẩu mới không khớp.';
      return;
  }

  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

  user.reauthenticateWithCredential(credential)
      .then(() => {
          return user.updatePassword(newPassword);
      })
      .then(() => {
          alert('Đổi mật khẩu thành công.');
          location.href = '../index.html'
      })
      .catch((error) => {
          console.error('Lỗi đổi mật khẩu:', error);
          messageChange.textContent = 'Mật khẩu hiện tại không đúng hoặc có lỗi xảy ra. Vui lòng thử lại.';
      });
}

function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('forgotPasswordForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('forgotPasswordForm').style.display = 'none';
}

function showForgotPassForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('forgotPasswordForm').style.display = 'block';
}

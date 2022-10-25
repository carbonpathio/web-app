from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    @classmethod
    def normalize_email(cls, email):
        return super().normalize_email(email).lower()

    def get_by_natural_key(self, email):
        return self.get(email=email)

    def _create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError("The given username must be set")

        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username: str, password: str = None, **kwargs):
        kwargs.setdefault("is_staff", False)
        kwargs.setdefault("is_superuser", False)
        user = self._create_user(username=username, password=password, **kwargs)
        user.save(using=self._db)
        return user

    def create_superuser(self, username: str, password: str = None, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)

        if kwargs.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if kwargs.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username=username, password=password, **kwargs)

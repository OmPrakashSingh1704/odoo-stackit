from user_profile.models import UserProfile

def create_user_profile(username, first_name, last_name, email, password):
    user = UserProfile(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
    user.save()
    return user
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it and see it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_superuser:
            return True
        
        # Might not be the proper way to do this
        # for checking perms of watering entries
        if hasattr(obj, 'plant'):
            return obj.plant.owner == request.user

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user